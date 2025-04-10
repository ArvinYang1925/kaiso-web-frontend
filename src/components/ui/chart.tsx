"use client"

import * as React from "react"
import { type TooltipProps } from "recharts"

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  config: ChartConfig
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

export function useChartConfig() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartConfig must be used within a ChartProvider")
  }
  return context.config
}

interface ChartTooltipContentProps<TData> {
  active?: boolean
  payload?: TooltipProps<any, any>["payload"]
  label?: string
  hideLabel?: boolean
}

export function ChartTooltipContent<TData>({
  active,
  payload,
  label,
  hideLabel = false,
}: ChartTooltipContentProps<TData>) {
  const config = useChartConfig()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="text-xs font-medium">{label ?? payload[0].name}</div>
      )}
      <div className="flex flex-col gap-0.5">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  item.color ??
                  (config[item.dataKey]?.color ??
                    config[item.name]?.color ??
                    "hsl(var(--chart-1))"),
              }}
            />
            <span className="font-medium">
              {config[item.dataKey]?.label ?? config[item.name]?.label ?? item.name}:
            </span>
            <span className="opacity-75">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartTooltip<TData>({
  children,
  ...props
}: TooltipProps<any, any>) {
  return <>{children}</>;
} 