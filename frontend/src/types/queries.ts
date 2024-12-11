import { UseMutationOptions } from '@tanstack/react-query'

export type MutationOptions<TResponse, TRequest> = UseMutationOptions<TResponse, Error, TRequest>
