'use client'
import { useEffect, useRef, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const WIDTH = 900
const HEIGHT = 620

type CityDef = {
  name: string
  coords: [number, number]
  r: number
  isHome: boolean
  dx: number
  dy: number
  anchor: 'start' | 'end' | 'middle'
}

const CITIES: CityDef[] = [
  { name: 'SYDNEY · HOME BASE', coords: [151.2093, -33.8688], r: 5, isHome: true,  dx:  10, dy: -10, anchor: 'start' },
  { name: 'AUCKLAND',           coords: [174.7633, -36.8485], r: 3, isHome: false, dx: -10, dy:  -8, anchor: 'end'   },
]

// ISO 3166-1 numeric codes
const HIGHLIGHTED = new Set([36, 554]) // Australia, New Zealand

// Countries to render — ANZ + immediate Pacific only
const VISIBLE_REGION = new Set([
  36,  // Australia
  554, // New Zealand
  598, // Papua New Guinea
  90,  // Solomon Islands
  548, // Vanuatu
  242, // Fiji
  540, // New Caledonia
  776, // Tonga
  882, // Samoa
])

const APAC_FEATURE = {
  type: 'Feature' as const,
  geometry: {
    type: 'Polygon' as const,
    coordinates: [[[110, -4], [181, -4], [181, -50], [110, -50], [110, -4]]],
  },
  properties: {},
}

type CountryPath = { id: number; d: string }
type CityPoint = CityDef & { x: number; y: number }
type ConnectionLine = { x1: number; y1: number; x2: number; y2: number; length: number }

export default function APACMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [paths, setPaths] = useState<CountryPath[]>([])
  const [cityPoints, setCityPoints] = useState<CityPoint[]>([])
  const [lines, setLines] = useState<ConnectionLine[]>([])
  const [loading, setLoading] = useState(true)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(
          'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const topo = (await res.json()) as any
        if (cancelled) return

        const projection = geoMercator().fitExtent(
          [
            [0, 0],
            [WIDTH, HEIGHT],
          ],
          APAC_FEATURE
        )
        const pathGen = geoPath(projection)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const geo = feature(topo, topo.objects.countries) as any

        const countryPaths: CountryPath[] = (geo.features as any[])
          .map((f: any) => ({ id: Number(f.id), d: pathGen(f) ?? '' }))
          .filter((p) => p.d && VISIBLE_REGION.has(p.id))

        setPaths(countryPaths)

        const projected: CityPoint[] = CITIES.map((city) => {
          const [x, y] = projection(city.coords) ?? [0, 0]
          return { ...city, x, y }
        })
        setCityPoints(projected)

        const sx = projected[0].x
        const sy = projected[0].y
        const connectionLines: ConnectionLine[] = projected.slice(1).map((city) => {
          const ddx = city.x - sx
          const ddy = city.y - sy
          return {
            x1: sx,
            y1: sy,
            x2: city.x,
            y2: city.y,
            length: Math.sqrt(ddx * ddx + ddy * ddy),
          }
        })
        setLines(connectionLines)
        setLoading(false)
      } catch (err) {
        console.error('[APACMap]', err)
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (loading) return
    const el = svgRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [loading])

  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: `${WIDTH} / ${HEIGHT}`,
          background: '#111111',
        }}
      />
    )
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      style={{ display: 'block' }}
    >
      {/* Country fills */}
      {paths.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill={HIGHLIGHTED.has(p.id) ? '#1C1B1B' : '#111111'}
          stroke={HIGHLIGHTED.has(p.id) ? 'rgba(154,139,71,0.25)' : '#2A2825'}
          strokeWidth={0.5}
        />
      ))}

      {/* Animated connection lines from Sydney */}
      {lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(154,139,71,0.4)"
          strokeWidth={0.8}
          strokeDasharray={line.length}
          strokeDashoffset={animated ? 0 : line.length}
          style={{
            transition: `stroke-dashoffset 1s ease-out ${0.2 + i * 0.15}s`,
          }}
        />
      ))}

      {/* City dots */}
      {cityPoints.map((city) => (
        <circle key={city.name} cx={city.x} cy={city.y} r={city.r} fill="#9A8B47" />
      ))}

      {/* City labels */}
      {cityPoints.map((city) => (
        <text
          key={`lbl-${city.name}`}
          x={city.x + city.dx}
          y={city.y + city.dy}
          textAnchor={city.anchor}
          fill={city.isHome ? '#9A8B47' : '#B8B2AE'}
          fontFamily="var(--font-inter, system-ui, sans-serif)"
          fontSize={9}
          fontWeight={city.isHome ? 700 : 400}
          letterSpacing="0.1em"
          style={{ textTransform: 'uppercase' }}
        >
          {city.name}
        </text>
      ))}
    </svg>
  )
}
