import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

export type MutationOptions<TResponse, TRequest> = UseMutationOptions<TResponse, Error, TRequest>
export type QueryOptions<TResponse> = Omit<UseQueryOptions<TResponse>, 'queryKey' | 'queryFn'>
