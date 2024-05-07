import {useToken} from '@/helpers'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as RawApolloProvider,
  from,
  split,
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {getMainDefinition} from '@apollo/client/utilities'
import {OperationDefinitionNode} from 'graphql'
import {createClient} from 'graphql-ws'
import {PropsWithChildren} from 'react'

const GRAPHQL_SERVER = '/graphql'

const HOST = (import.meta as any).env.VITE_HOST

const httpLink = new HttpLink({uri: GRAPHQL_SERVER})

function useClient() {
  const [token, , clear] = useToken()
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `ws://${HOST}${GRAPHQL_SERVER}`,
      connectionParams: {
        authorization: `Token ${token}`,
      },
    })
  )
  const authTokenLink = setContext(({operationName}, context) => {
    return {
      uri: `http://${HOST}${GRAPHQL_SERVER}/${operationName}`,
      headers: {
        ...context.headers,
        authorization: `Token ${token}`,
      },
    }
  })
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors || networkError) {
      console.error(graphQLErrors || networkError)
      if (
        graphQLErrors?.some(
          ({extensions}) => extensions.code === 'AUTHENTICATION_ERROR'
        )
      ) {
        clear()
        window.location.pathname = '/'
      }
    }
  })
  const networkLink = split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(
        query
      ) as OperationDefinitionNode
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  return new ApolloClient({
    version: '1.0',
    cache: new InMemoryCache(),
    link: from([authTokenLink, errorLink, token ? networkLink : httpLink]),
    defaultOptions: {
      mutate: {
        errorPolicy: 'none',
        fetchPolicy: 'no-cache',
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
    },
  })
}

export function ApolloProvider(props: PropsWithChildren) {
  return (
    <RawApolloProvider client={useClient()}>
      <>{props.children}</>
    </RawApolloProvider>
  )
}
