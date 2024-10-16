'use client'

import { ExecuteResult } from '@abstract-money/cli/cosmjs'
import { UseMutationOptions } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  useAbstractModuleClient,
  useAbstractModuleQueryClient,
  useModuleClient,
  useModuleQueryClient,
} from '@abstract-money/react'

import { AccountId } from '@abstract-money/core'

import {
  useCw721BaseUpdateOwnershipMutation,
  Cw721BaseUpdateOwnershipMutation,
  useCw721BaseWithdrawFundsMutation,
  Cw721BaseWithdrawFundsMutation,
  useCw721BaseRemoveWithdrawAddressMutation,
  Cw721BaseRemoveWithdrawAddressMutation,
  useCw721BaseSetWithdrawAddressMutation,
  Cw721BaseSetWithdrawAddressMutation,
  useCw721BaseExtensionMutation,
  Cw721BaseExtensionMutation,
  useCw721BaseBurnMutation,
  Cw721BaseBurnMutation,
  useCw721BaseMintMutation,
  Cw721BaseMintMutation,
  useCw721BaseRevokeAllMutation,
  Cw721BaseRevokeAllMutation,
  useCw721BaseApproveAllMutation,
  Cw721BaseApproveAllMutation,
  useCw721BaseRevokeMutation,
  Cw721BaseRevokeMutation,
  useCw721BaseApproveMutation,
  Cw721BaseApproveMutation,
  useCw721BaseSendNftMutation,
  Cw721BaseSendNftMutation,
  useCw721BaseTransferNftMutation,
  Cw721BaseTransferNftMutation,
  useCw721BaseOwnershipQuery,
  useCw721BaseGetWithdrawAddressQuery,
  useCw721BaseExtensionQuery,
  useCw721BaseMinterQuery,
  useCw721BaseAllTokensQuery,
  useCw721BaseTokensQuery,
  useCw721BaseAllNftInfoQuery,
  useCw721BaseNftInfoQuery,
  useCw721BaseContractInfoQuery,
  useCw721BaseNumTokensQuery,
  useCw721BaseAllOperatorsQuery,
  useCw721BaseOperatorQuery,
  useCw721BaseApprovalsQuery,
  useCw721BaseApprovalQuery,
  useCw721BaseOwnerOfQuery,
} from './cosmwasm-codegen/Cw721Base.react-query'

import * as Cw721BaseTypes from './cosmwasm-codegen/Cw721Base.types'

import {
  Cw721BaseQueryClient,
  Cw721BaseClient,
} from './cosmwasm-codegen/Cw721Base.client'

import {
  useEvmNoteExecuteMutation,
  EvmNoteExecuteMutation,
  useEvmNoteAckInfosQuery,
  useEvmNoteRemoteAddressQuery,
} from './cosmwasm-codegen/EvmNote.react-query'

import * as EvmNoteTypes from './cosmwasm-codegen/EvmNote.types'

import {
  EvmNoteAppQueryClient,
  EvmNoteAppClient,
} from './cosmwasm-codegen/EvmNote.client'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cw721Base
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EvmNote
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cw721Base = {
  queries: {
    useOwnership: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseOwnershipQuery<Cw721BaseTypes.OwnershipForString>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseOwnershipQuery({
        client: cw721BaseQueryClient,
        options,
      })
    },
    useGetWithdrawAddress: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseGetWithdrawAddressQuery<Cw721BaseTypes.NullableString>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseGetWithdrawAddressQuery({
        client: cw721BaseQueryClient,
        options,
      })
    },
    useExtension: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<typeof useCw721BaseExtensionQuery<Cw721BaseTypes.Null>>[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseExtensionQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useMinter: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseMinterQuery<Cw721BaseTypes.MinterResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseMinterQuery({
        client: cw721BaseQueryClient,
        options,
      })
    },
    useAllTokens: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseAllTokensQuery<Cw721BaseTypes.TokensResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseAllTokensQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useTokens: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseTokensQuery<Cw721BaseTypes.TokensResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseTokensQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useAllNftInfo: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseAllNftInfoQuery<Cw721BaseTypes.AllNftInfoResponseForEmpty>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseAllNftInfoQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useNftInfo: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseNftInfoQuery<Cw721BaseTypes.NftInfoResponseForEmpty>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseNftInfoQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useContractInfo: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseContractInfoQuery<Cw721BaseTypes.ContractInfoResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseContractInfoQuery({
        client: cw721BaseQueryClient,
        options,
      })
    },
    useNumTokens: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseNumTokensQuery<Cw721BaseTypes.NumTokensResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseNumTokensQuery({
        client: cw721BaseQueryClient,
        options,
      })
    },
    useAllOperators: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseAllOperatorsQuery<Cw721BaseTypes.OperatorsResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseAllOperatorsQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useOperator: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseOperatorQuery<Cw721BaseTypes.OperatorResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseOperatorQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useApprovals: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseApprovalsQuery<Cw721BaseTypes.ApprovalsResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseApprovalsQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useApproval: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseApprovalQuery<Cw721BaseTypes.ApprovalResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseApprovalQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
    useOwnerOf: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw721BaseOwnerOfQuery<Cw721BaseTypes.OwnerOfResponse>
      >[0],
      'client'
    > & { contractAddress: string | undefined }) => {
      const { data: cw721BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw721BaseQueryClient,
      })

      return useCw721BaseOwnerOfQuery({
        client: cw721BaseQueryClient,
        options,
        args,
      })
    },
  },
  mutations: {
    useUpdateOwnership: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseUpdateOwnershipMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseUpdateOwnershipMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useWithdrawFunds: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseWithdrawFundsMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseWithdrawFundsMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useRemoveWithdrawAddress: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseRemoveWithdrawAddressMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseRemoveWithdrawAddressMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useSetWithdrawAddress: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseSetWithdrawAddressMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseSetWithdrawAddressMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useExtension: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseExtensionMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseExtensionMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useBurn: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseBurnMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseBurnMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useMint: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseMintMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseMintMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useRevokeAll: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseRevokeAllMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseRevokeAllMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useApproveAll: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseApproveAllMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseApproveAllMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useRevoke: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseRevokeMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseRevokeMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useApprove: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseApproveMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseApproveMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useSendNft: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseSendNftMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseSendNftMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useTransferNft: (
      {
        contractAddress,
        sender,
      }: { contractAddress: string | undefined; sender?: string | undefined },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw721BaseTransferNftMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw721BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw721BaseClientLoading,
        // isError: isCw721BaseClientError,
        // error: cw721BaseClientError,
      } = useModuleClient({
        contractAddress,
        Module: Cw721BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw721BaseTransferNftMutation(options)

      const mutate = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw721BaseClient, ...variables }, options)
      }, [mutate_, cw721BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw721BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw721BaseClient, ...variables }, options)
      }, [mutateAsync_, cw721BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
  },
}

export const EVM_NOTE_MODULE_ID = 'abstract:evm-note'

export const evmNote = {
  queries: {
    useAckInfos: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useEvmNoteAckInfosQuery<EvmNoteTypes.AckInfosResponse>
      >[0],
      'client'
    > & {
      accountId: AccountId | undefined
      chainName: string | undefined
    }) => {
      const { data: evmNoteAppQueryClient } = useAbstractModuleQueryClient({
        moduleId: EVM_NOTE_MODULE_ID,
        ...rest,
        Module: EvmNoteAppQueryClient,
        query: { enabled: options?.enabled },
      })

      return useEvmNoteAckInfosQuery({
        client: evmNoteAppQueryClient,
        options,
        args,
      })
    },
    useRemoteAddress: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useEvmNoteRemoteAddressQuery<EvmNoteTypes.NullableString>
      >[0],
      'client'
    > & {
      accountId: AccountId | undefined
      chainName: string | undefined
    }) => {
      const { data: evmNoteAppQueryClient } = useAbstractModuleQueryClient({
        moduleId: EVM_NOTE_MODULE_ID,
        ...rest,
        Module: EvmNoteAppQueryClient,
        query: { enabled: options?.enabled },
      })

      return useEvmNoteRemoteAddressQuery({
        client: evmNoteAppQueryClient,
        options,
        args,
      })
    },
  },
  mutations: {
    useExecute: (
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
          Omit<EvmNoteExecuteMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: evmNoteAppClient,
        // TODO: figure out what to do with those
        // isLoading: isEvmNoteAppClientLoading,
        // isError: isEvmNoteAppClientError,
        // error: evmNoteAppClientError,
      } = useAbstractModuleClient({
        moduleId: EVM_NOTE_MODULE_ID,
        accountId,
        chainName,
        sender,

        Module: EvmNoteAppClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useEvmNoteExecuteMutation(options)

      const mutate = useMemo(() => {
        if (!evmNoteAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: evmNoteAppClient, ...variables }, options)
      }, [mutate_, evmNoteAppClient])

      const mutateAsync = useMemo(() => {
        if (!evmNoteAppClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: evmNoteAppClient, ...variables }, options)
      }, [mutateAsync_, evmNoteAppClient])

      return { mutate, mutateAsync, ...rest } as const
    },
  },
}
