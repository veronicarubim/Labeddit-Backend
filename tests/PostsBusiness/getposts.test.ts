import {PostsBusiness} from '../../src/business/PostsBusiness'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"

describe('get posts endpoint', () => {
    const postBusiness = new PostsBusiness(
        new PostsDatabaseMock(),
        new IdGeneratorMock(),        
        new TokenManagerMock(),

    )
})