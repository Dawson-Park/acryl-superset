/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { format as d3Format } from 'd3-format';
import NumberFormatter from '../NumberFormatter';
import NumberFormats from '../NumberFormats';

// const siFormatter = d3Format(`.3~s`);
const float2PointFormatter = d3Format(`.2~f`);
const float4PointFormatter = d3Format(`.4~f`);

// const siToKr = (value: string) => {
//   return value.replace('k', '천')
//     .replace('M', '백만')
//     .replace('B', '십억')
//     .replace('T', '조')
//     .replace('Qd', '천조');
// }

const kiFormatter = (n: (number | { valueOf(): number })):string => {
  const num = n.valueOf();

  // Define the units and their corresponding divisor values
  const units = [
    { threshold: 1000000000000, divisor: 1000000000000, unit: '조' },
    { threshold: 100000000, divisor: 100000000, unit: '억' },
    { threshold: 10000, divisor: 10000, unit: '만' },
    { threshold: 1000, divisor: 1000, unit: '천' }
  ];

  // Loop through each unit to find the appropriate formatting
  for (let i = 0; i < units.length; i++) {
    if (num >= units[i].threshold) {
      let value = num / units[i].divisor;
      // Format the number using Intl.NumberFormat
      let formattedValue = new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
      }).format(value);

      // Append the unit and return the formatted string
      return formattedValue + units[i].unit;
    }
  }

  // For numbers less than 1000, just return the number with no unit
  return num.toString();
}

function formatValue(value: number) {
  if (value === 0) {
    return '0';
  }
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 1000) {
    // Normal human being are more familiar
    // with billion (B) that giga (G)
    // return siToKr(siFormatter(value).replace('G', 'B'));
    return kiFormatter(value);
  }
  if (absoluteValue >= 1) {
    return float2PointFormatter(value);
  }
  if (absoluteValue >= 0.001) {
    return float4PointFormatter(value);
  }
  if (absoluteValue > 0.000001) {
    // return `${siFormatter(value * 1000000)}µ`;
    return `${kiFormatter(value * 1000000)}µ`;
  }
  // return siFormatter(value);
  return kiFormatter(value);
}

export default function createSmartNumberFormatter(
  config: {
    description?: string;
    signed?: boolean;
    id?: string;
    label?: string;
  } = {},
) {
  const { description, signed = false, id, label } = config;
  const getSign = signed ? (value: number) => (value > 0 ? '+' : '') : () => '';

  return new NumberFormatter({
    description,
    formatFunc: value => `${getSign(value)}${formatValue(value)}`,
    id:
      id || signed
        ? NumberFormats.SMART_NUMBER_SIGNED
        : NumberFormats.SMART_NUMBER,
    label: label ?? 'Adaptive formatter',
  });
}
