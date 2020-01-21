import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { ensureLoggedOut } from '../auth'

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...arg) {
      const [ , , contex ] = arg

      ensureLoggedOut(contex.req)

      return resolve.apply(this, arg)
    }
  }
}

export default GuestDirective
