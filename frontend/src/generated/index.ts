'use client'

import { ExecuteResult } from '@abstract-money/cli/cosmjs'
import { UseMutationOptions } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  useAbstractModuleClient,
  useAbstractModuleQueryClient,
} from '@abstract-money/react'

import { AccountId } from '@abstract-money/core'

import {
  useMyAppReceiveMutation,
  MyAppReceiveMutation,
  useMyAppModuleIbcMutation,
  MyAppModuleIbcMutation,
  useMyAppIbcCallbackMutation,
  MyAppIbcCallbackMutation,
  useMyAppModuleMutation,
  MyAppModuleMutation,
  useMyAppBaseMutation,
  MyAppBaseMutation,
  useMyAppModuleQuery,
  useMyAppBaseQuery,
} from './cosmwasm-codegen/MyApp.react-query'

import * as MyAppTypes from './cosmwasm-codegen/MyApp.types'

import {
  MyAppAppQueryClient,
  MyAppAppClient,
} from './cosmwasm-codegen/MyApp.client'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MyApp
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const MY_APP_MODULE_ID = 'local:MyApp'

export const myApp = {
  queries: {
    useModule: ({
      options,
      ...rest
    }: Omit<
      Parameters<typeof useMyAppModuleQuery<MyAppTypes.ModuleResponse>>[0],
      'client'
    > & {
      accountId: AccountId | undefined
      chainName: string | undefined
    }) => {
      const { data: myAppAppQueryClient } = useAbstractModuleQueryClient({
        moduleId: MY_APP_MODULE_ID,
        ...rest,
        Module: MyAppAppQueryClient,
        query: { enabled: options?.enabled },
      })

      return useMyAppModuleQuery({
        client: myAppAppQueryClient,
        options,
      })
    },
    useBase: ({
      options,
      ...rest
    }: Omit<
      Parameters<typeof useMyAppBaseQuery<MyAppTypes.BaseResponse>>[0],
      'client'
    > & {
      accountId: AccountId | undefined
      chainName: string | undefined
    }) => {
      const { data: myAppAppQueryClient } = useAbstractModuleQueryClient({
        moduleId: MY_APP_MODULE_ID,
        ...rest,
        Module: MyAppAppQueryClient,
        query: { enabled: options?.enabled },
      })

      return useMyAppBaseQuery({
        client: myAppAppQueryClient,
        options,
      })
    },
  },
  mutations: {
    useReceive: (
      {
        accountId,
        chainName,
        sender,
      }: {
        accountId: AccountId | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<MyAppReceiveMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: myAppAppClient,
        // TODO: figure out what to do with those
        // isLoading: isMyAppAppClientLoading,
        // isError: isMyAppAppClientError,
        // error: myAppAppClientError,
      } = useAbstractModuleClient({
        moduleId: MY_APP_MODULE_ID,
        accountId,
        chainName,
        sender,

        Module: MyAppAppClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useMyAppReceiveMutation(options)

      const mutate = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: myAppAppClient, ...variables }, options)
      }, [mutate_, myAppAppClient])

      const mutateAsync = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: myAppAppClient, ...variables }, options)
      }, [mutateAsync_, myAppAppClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useModuleIbc: (
      {
        accountId,
        chainName,
        sender,
      }: {
        accountId: AccountId | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<MyAppModuleIbcMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: myAppAppClient,
        // TODO: figure out what to do with those
        // isLoading: isMyAppAppClientLoading,
        // isError: isMyAppAppClientError,
        // error: myAppAppClientError,
      } = useAbstractModuleClient({
        moduleId: MY_APP_MODULE_ID,
        accountId,
        chainName,
        sender,

        Module: MyAppAppClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useMyAppModuleIbcMutation(options)

      const mutate = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: myAppAppClient, ...variables }, options)
      }, [mutate_, myAppAppClient])

      const mutateAsync = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: myAppAppClient, ...variables }, options)
      }, [mutateAsync_, myAppAppClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useIbcCallback: (
      {
        accountId,
        chainName,
        sender,
      }: {
        accountId: AccountId | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<MyAppIbcCallbackMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: myAppAppClient,
        // TODO: figure out what to do with those
        // isLoading: isMyAppAppClientLoading,
        // isError: isMyAppAppClientError,
        // error: myAppAppClientError,
      } = useAbstractModuleClient({
        moduleId: MY_APP_MODULE_ID,
        accountId,
        chainName,
        sender,

        Module: MyAppAppClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useMyAppIbcCallbackMutation(options)

      const mutate = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: myAppAppClient, ...variables }, options)
      }, [mutate_, myAppAppClient])

      const mutateAsync = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: myAppAppClient, ...variables }, options)
      }, [mutateAsync_, myAppAppClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useModule: (
      {
        accountId,
        chainName,
        sender,
      }: {
        accountId: AccountId | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<MyAppModuleMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: myAppAppClient,
        // TODO: figure out what to do with those
        // isLoading: isMyAppAppClientLoading,
        // isError: isMyAppAppClientError,
        // error: myAppAppClientError,
      } = useAbstractModuleClient({
        moduleId: MY_APP_MODULE_ID,
        accountId,
        chainName,
        sender,

        Module: MyAppAppClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useMyAppModuleMutation(options)

      const mutate = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: myAppAppClient, ...variables }, options)
      }, [mutate_, myAppAppClient])

      const mutateAsync = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: myAppAppClient, ...variables }, options)
      }, [mutateAsync_, myAppAppClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useBase: (
      {
        accountId,
        chainName,
        sender,
      }: {
        accountId: AccountId | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<MyAppBaseMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: myAppAppClient,
        // TODO: figure out what to do with those
        // isLoading: isMyAppAppClientLoading,
        // isError: isMyAppAppClientError,
        // error: myAppAppClientError,
      } = useAbstractModuleClient({
        moduleId: MY_APP_MODULE_ID,
        accountId,
        chainName,
        sender,

        Module: MyAppAppClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useMyAppBaseMutation(options)

      const mutate = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: myAppAppClient, ...variables }, options)
      }, [mutate_, myAppAppClient])

      const mutateAsync = useMemo(() => {
        if (!myAppAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: myAppAppClient, ...variables }, options)
      }, [mutateAsync_, myAppAppClient])

      return { mutate, mutateAsync, ...rest } as const
    },
  },
}
