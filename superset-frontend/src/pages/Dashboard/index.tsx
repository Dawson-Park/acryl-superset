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
import React from 'react';
import { useParams } from 'react-router-dom';
import { BootstrapUser } from 'src/types/bootstrapTypes';
import { DashboardPage } from 'src/dashboard/containers/DashboardPage';
import { DashboardPage as ClientDashboardPage } from 'src/client/containers/DashboardPage';

interface WelcomeProps {
  user: BootstrapUser;
}

const DashboardRoute = ({ user }: WelcomeProps) => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  console.log(Object.keys(user?.roles ?? {}));

  // @TODO: @dawson URL을 확인해서 파라미터값에 jsessionId가 있으면 dashboard로 이동 아니면 말고
  // return Object.keys(user?.roles ?? {}).includes('Client') ? (
  //   <ClientDashboardPage idOrSlug={idOrSlug} />
  // ) : (
  //   <DashboardPage idOrSlug={idOrSlug} />
  // );
  return Object.keys(user?.roles ?? {})[0] === 'Admin' ? (
    <DashboardPage idOrSlug={idOrSlug} />
  ) : (
    <ClientDashboardPage idOrSlug={idOrSlug} />
  );
};

export default DashboardRoute;
