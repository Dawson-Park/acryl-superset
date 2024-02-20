import React, { useEffect, useRef, useCallback } from 'react';
import { ChartProps } from '@superset-ui/core';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface LineRaceProps {
  // chartType: string;
  chartProps: ChartProps;
  id?: string;
  className?: string;
}

// const UNIX = 1970;
// const YEAR = 3600 * 1000 * 24 * 31 * 12;

const LineRace = ({ id, chartProps, className }: LineRaceProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const run = useCallback(() => {
    const myChart = echarts.init(ref.current);
    const queriesData = chartProps.queriesData[0].data;

    const xAxis = chartProps.rawFormData.x_axis as string;
    const colnames = chartProps.queriesData[0].colnames.filter(
      (v: string) => v !== xAxis,
    );

    const rawData = (() => {
      const result: Array<string | number>[] = [];

      for (let i = 0; i < queriesData.length; i++) {
        const current = queriesData[i];
        for (const col of colnames) {
          result.push([
            current[col] ?? 0,
            col,
            new Date(current[xAxis]).getFullYear(),
          ]);
        }
      }

      return [['NumberOf', 'Name', 'Year'], ...result];
    })();

    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];
    echarts.util.each(colnames, (name: string) => {
      const datasetId = `dataset_${name}`;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              // { dimension: 'Year', gte: 1965 },
              { dimension: 'Name', '=': name },
            ],
          },
        },
      });
      seriesList.push({
        type: 'line',
        datasetId,
        showSymbol: false,
        name,
        endLabel: {
          show: true,
          formatter: (params: any) => `${params.value[1]}: ${params.value[0]}`,
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        emphasis: {
          focus: 'series',
        },
        encode: {
          x: 'Year',
          y: 'NumberOf',
          label: ['Name', 'NumberOf'],
          itemName: 'Year',
          tooltip: ['NumberOf'],
        },
      });
    });

    const option: EChartsOption = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: rawData,
        },
        ...datasetWithFilters,
      ],
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis',
        appendToBody: true,
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
      },
      yAxis: {
        name: 'NumberOf',
      },
      grid: {
        right: 120,
        left: 60,
      },
      series: seriesList,
    };

    myChart.setOption(option);
    return myChart;
  }, [chartProps]);

  useEffect(() => {
    let chart: any;
    const intervalId = setInterval(() => {
      if (chart) chart.dispose();
      chart = run();
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [chartProps]);

  return (
    <div
      ref={ref}
      id={id}
      style={{
        width: chartProps.width,
        height: chartProps.height,
      }}
      className={className}
    />
  );
};

export default React.memo(LineRace);
