/* eslint-disable */
import {gql} from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: number
  Void: undefined
}

export type CreateArticleInput = {
  /** 文章内容-序列化字符串 */
  content: Scalars['String']
  /** 文章封面 */
  cover?: InputMaybe<IdInput>
  /** 内容简介 */
  summary: Scalars['String']
  /** 标签绑定 */
  tags: Array<IdInput>
  /** 文章标题 */
  title: Scalars['String']
}

export type IdInput = {
  id: Scalars['String']
}

export type SearchInput = {
  /** 模糊搜索 */
  search?: InputMaybe<Scalars['String']>
}

export type TagListInput = {
  /** 标签类型 */
  type?: InputMaybe<TagType>
}

export type TagType =
  /** 文章 */
  'ARTICLE'

export type UpdateArticleInput = {
  /** 文章内容-序列化字符串 */
  content: Scalars['String']
  /** 文章封面 */
  cover?: InputMaybe<IdInput>
  id: Scalars['String']
  /** 内容简介 */
  summary: Scalars['String']
  /** 标签绑定 */
  tags: Array<IdInput>
  /** 文章标题 */
  title: Scalars['String']
}

export type UpdateMeInput = {
  /** 头像 */
  avatar?: InputMaybe<IdInput>
  /** 名称 */
  name?: InputMaybe<Scalars['String']>
  /** 个性签名 */
  signature?: InputMaybe<Scalars['String']>
}

export type CreateArticleMutationVariables = Exact<{
  input: CreateArticleInput
}>

export type CreateArticleMutation = {
  __typename?: 'Mutation'
  createArticle: boolean
}

export type UpdateArticleMutationVariables = Exact<{
  input: UpdateArticleInput
}>

export type UpdateArticleMutation = {
  __typename?: 'Mutation'
  updateArticle: boolean
}

export type DeleteArticleMutationVariables = Exact<{
  input: IdInput
}>

export type DeleteArticleMutation = {
  __typename?: 'Mutation'
  deleteArticle: boolean
}

export type HomeArticleListQueryVariables = Exact<{
  filter?: InputMaybe<SearchInput>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}>

export type HomeArticleListQuery = {
  __typename?: 'Query'
  homeArticleList: Array<{
    __typename?: 'Article'
    content: string
    createTime: number
    id: string
    summary: string
    title: string
    updateTime: number
    author: {__typename?: 'User'; name: string}
    cover?: {__typename?: 'Image'; name: string; url: string} | null
    tags: Array<{__typename?: 'Tag'; name: string}>
  }>
}

export type TagListQueryVariables = Exact<{
  filter?: InputMaybe<TagListInput>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}>

export type TagListQuery = {
  __typename?: 'Query'
  tagList: Array<{
    __typename?: 'Tag'
    createTime: number
    id: string
    isPreset: boolean
    name: string
    type: TagType
    updateTime: number
  }>
}

export type LoginByEmailMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginByEmailMutation = {
  __typename?: 'Mutation'
  loginByEmail: {__typename?: 'AuthInfo'; userId: string; token: string}
}

export type SendEmailVerificationCodeMutationVariables = Exact<{
  email: Scalars['String']
}>

export type SendEmailVerificationCodeMutation = {
  __typename?: 'Mutation'
  sendEmailVerificationCode?: boolean | null
}

export type LogonByEmailMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
  verificationCode: Scalars['String']
}>

export type LogonByEmailMutation = {
  __typename?: 'Mutation'
  logonByEmail: {__typename?: 'AuthInfo'; token: string; userId: string}
}

export type ResetPasswordByEmailMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
  verificationCode: Scalars['String']
}>

export type ResetPasswordByEmailMutation = {
  __typename?: 'Mutation'
  resetPasswordByEmail: boolean
}

export type HomeUserListQueryVariables = Exact<{
  filter?: InputMaybe<SearchInput>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}>

export type HomeUserListQuery = {
  __typename?: 'Query'
  homeUserList: Array<{
    __typename?: 'User'
    id: string
    name: string
    signature?: string | null
    avatar?: {__typename?: 'Image'; name: string; url: string} | null
  }>
}

export const CreateArticleDocument = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input)
  }
`
export type CreateArticleMutationFn = Apollo.MutationFunction<
  CreateArticleMutation,
  CreateArticleMutationVariables
>

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >(CreateArticleDocument, options)
}
export type CreateArticleMutationHookResult = ReturnType<
  typeof useCreateArticleMutation
>
export type CreateArticleMutationResult =
  Apollo.MutationResult<CreateArticleMutation>
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<
  CreateArticleMutation,
  CreateArticleMutationVariables
>
export const UpdateArticleDocument = gql`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input)
  }
`
export type UpdateArticleMutationFn = Apollo.MutationFunction<
  UpdateArticleMutation,
  UpdateArticleMutationVariables
>

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >(UpdateArticleDocument, options)
}
export type UpdateArticleMutationHookResult = ReturnType<
  typeof useUpdateArticleMutation
>
export type UpdateArticleMutationResult =
  Apollo.MutationResult<UpdateArticleMutation>
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<
  UpdateArticleMutation,
  UpdateArticleMutationVariables
>
export const DeleteArticleDocument = gql`
  mutation DeleteArticle($input: IdInput!) {
    deleteArticle(input: $input)
  }
`
export type DeleteArticleMutationFn = Apollo.MutationFunction<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >(DeleteArticleDocument, options)
}
export type DeleteArticleMutationHookResult = ReturnType<
  typeof useDeleteArticleMutation
>
export type DeleteArticleMutationResult =
  Apollo.MutationResult<DeleteArticleMutation>
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>
export const HomeArticleListDocument = gql`
  query HomeArticleList($filter: SearchInput, $limit: Int, $offset: Int) {
    homeArticleList(filter: $filter, limit: $limit, offset: $offset) {
      author {
        name
      }
      content
      cover {
        name
        url
      }
      createTime
      id
      summary
      tags {
        name
      }
      title
      updateTime
    }
  }
`

/**
 * __useHomeArticleListQuery__
 *
 * To run a query within a React component, call `useHomeArticleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeArticleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeArticleListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useHomeArticleListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    HomeArticleListQuery,
    HomeArticleListQueryVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<HomeArticleListQuery, HomeArticleListQueryVariables>(
    HomeArticleListDocument,
    options
  )
}
export function useHomeArticleListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeArticleListQuery,
    HomeArticleListQueryVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<
    HomeArticleListQuery,
    HomeArticleListQueryVariables
  >(HomeArticleListDocument, options)
}
export type HomeArticleListQueryHookResult = ReturnType<
  typeof useHomeArticleListQuery
>
export type HomeArticleListLazyQueryHookResult = ReturnType<
  typeof useHomeArticleListLazyQuery
>
export type HomeArticleListQueryResult = Apollo.QueryResult<
  HomeArticleListQuery,
  HomeArticleListQueryVariables
>
export const TagListDocument = gql`
  query TagList($filter: TagListInput, $limit: Int, $offset: Int) {
    tagList(filter: $filter, limit: $limit, offset: $offset) {
      createTime
      id
      isPreset
      name
      type
      updateTime
    }
  }
`

/**
 * __useTagListQuery__
 *
 * To run a query within a React component, call `useTagListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTagListQuery(
  baseOptions?: Apollo.QueryHookOptions<TagListQuery, TagListQueryVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<TagListQuery, TagListQueryVariables>(
    TagListDocument,
    options
  )
}
export function useTagListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TagListQuery, TagListQueryVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<TagListQuery, TagListQueryVariables>(
    TagListDocument,
    options
  )
}
export type TagListQueryHookResult = ReturnType<typeof useTagListQuery>
export type TagListLazyQueryHookResult = ReturnType<typeof useTagListLazyQuery>
export type TagListQueryResult = Apollo.QueryResult<
  TagListQuery,
  TagListQueryVariables
>
export const LoginByEmailDocument = gql`
  mutation LoginByEmail($email: String!, $password: String!) {
    loginByEmail(email: $email, password: $password) {
      userId
      token
    }
  }
`
export type LoginByEmailMutationFn = Apollo.MutationFunction<
  LoginByEmailMutation,
  LoginByEmailMutationVariables
>

/**
 * __useLoginByEmailMutation__
 *
 * To run a mutation, you first call `useLoginByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginByEmailMutation, { data, loading, error }] = useLoginByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginByEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginByEmailMutation,
    LoginByEmailMutationVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    LoginByEmailMutation,
    LoginByEmailMutationVariables
  >(LoginByEmailDocument, options)
}
export type LoginByEmailMutationHookResult = ReturnType<
  typeof useLoginByEmailMutation
>
export type LoginByEmailMutationResult =
  Apollo.MutationResult<LoginByEmailMutation>
export type LoginByEmailMutationOptions = Apollo.BaseMutationOptions<
  LoginByEmailMutation,
  LoginByEmailMutationVariables
>
export const SendEmailVerificationCodeDocument = gql`
  mutation SendEmailVerificationCode($email: String!) {
    sendEmailVerificationCode(email: $email)
  }
`
export type SendEmailVerificationCodeMutationFn = Apollo.MutationFunction<
  SendEmailVerificationCodeMutation,
  SendEmailVerificationCodeMutationVariables
>

/**
 * __useSendEmailVerificationCodeMutation__
 *
 * To run a mutation, you first call `useSendEmailVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailVerificationCodeMutation, { data, loading, error }] = useSendEmailVerificationCodeMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendEmailVerificationCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendEmailVerificationCodeMutation,
    SendEmailVerificationCodeMutationVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    SendEmailVerificationCodeMutation,
    SendEmailVerificationCodeMutationVariables
  >(SendEmailVerificationCodeDocument, options)
}
export type SendEmailVerificationCodeMutationHookResult = ReturnType<
  typeof useSendEmailVerificationCodeMutation
>
export type SendEmailVerificationCodeMutationResult =
  Apollo.MutationResult<SendEmailVerificationCodeMutation>
export type SendEmailVerificationCodeMutationOptions =
  Apollo.BaseMutationOptions<
    SendEmailVerificationCodeMutation,
    SendEmailVerificationCodeMutationVariables
  >
export const LogonByEmailDocument = gql`
  mutation LogonByEmail(
    $email: String!
    $password: String!
    $verificationCode: String!
  ) {
    logonByEmail(
      email: $email
      password: $password
      verificationCode: $verificationCode
    ) {
      token
      userId
    }
  }
`
export type LogonByEmailMutationFn = Apollo.MutationFunction<
  LogonByEmailMutation,
  LogonByEmailMutationVariables
>

/**
 * __useLogonByEmailMutation__
 *
 * To run a mutation, you first call `useLogonByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogonByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logonByEmailMutation, { data, loading, error }] = useLogonByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useLogonByEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogonByEmailMutation,
    LogonByEmailMutationVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    LogonByEmailMutation,
    LogonByEmailMutationVariables
  >(LogonByEmailDocument, options)
}
export type LogonByEmailMutationHookResult = ReturnType<
  typeof useLogonByEmailMutation
>
export type LogonByEmailMutationResult =
  Apollo.MutationResult<LogonByEmailMutation>
export type LogonByEmailMutationOptions = Apollo.BaseMutationOptions<
  LogonByEmailMutation,
  LogonByEmailMutationVariables
>
export const ResetPasswordByEmailDocument = gql`
  mutation ResetPasswordByEmail(
    $email: String!
    $password: String!
    $verificationCode: String!
  ) {
    resetPasswordByEmail(
      email: $email
      password: $password
      verificationCode: $verificationCode
    )
  }
`
export type ResetPasswordByEmailMutationFn = Apollo.MutationFunction<
  ResetPasswordByEmailMutation,
  ResetPasswordByEmailMutationVariables
>

/**
 * __useResetPasswordByEmailMutation__
 *
 * To run a mutation, you first call `useResetPasswordByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordByEmailMutation, { data, loading, error }] = useResetPasswordByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useResetPasswordByEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetPasswordByEmailMutation,
    ResetPasswordByEmailMutationVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    ResetPasswordByEmailMutation,
    ResetPasswordByEmailMutationVariables
  >(ResetPasswordByEmailDocument, options)
}
export type ResetPasswordByEmailMutationHookResult = ReturnType<
  typeof useResetPasswordByEmailMutation
>
export type ResetPasswordByEmailMutationResult =
  Apollo.MutationResult<ResetPasswordByEmailMutation>
export type ResetPasswordByEmailMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordByEmailMutation,
  ResetPasswordByEmailMutationVariables
>
export const HomeUserListDocument = gql`
  query HomeUserList($filter: SearchInput, $limit: Int, $offset: Int) {
    homeUserList(filter: $filter, limit: $limit, offset: $offset) {
      id
      avatar {
        name
        url
      }
      name
      signature
    }
  }
`

/**
 * __useHomeUserListQuery__
 *
 * To run a query within a React component, call `useHomeUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeUserListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useHomeUserListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    HomeUserListQuery,
    HomeUserListQueryVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<HomeUserListQuery, HomeUserListQueryVariables>(
    HomeUserListDocument,
    options
  )
}
export function useHomeUserListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeUserListQuery,
    HomeUserListQueryVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<HomeUserListQuery, HomeUserListQueryVariables>(
    HomeUserListDocument,
    options
  )
}
export type HomeUserListQueryHookResult = ReturnType<
  typeof useHomeUserListQuery
>
export type HomeUserListLazyQueryHookResult = ReturnType<
  typeof useHomeUserListLazyQuery
>
export type HomeUserListQueryResult = Apollo.QueryResult<
  HomeUserListQuery,
  HomeUserListQueryVariables
>
