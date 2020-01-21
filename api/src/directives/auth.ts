import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { ensureLoggedIn } from '../auth'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...arg) {
      const [ , , contex ] = arg

      ensureLoggedIn(contex.req)

      return resolve.apply(this, arg)
    }
  }
}

export default AuthDirective
