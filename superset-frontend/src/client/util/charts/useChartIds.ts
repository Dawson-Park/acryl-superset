/**
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
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/client/types';
import { useMemoCompare } from 'src/hooks/useMemoCompare';

const chartIdsSelector = createSelector(
  (state: RootState) => state.charts,
  charts => Object.values(charts).map(chart => chart.id),
);

export const useChartIds = () => {
  const chartIds = useSelector<RootState, number[]>(chartIdsSelector);
  return useMemoCompare(
    chartIds,
    (prev, next) => prev === next || isEqual(prev, next),
  );
};
