import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime'
import {server} from "../../src/mocks/server";

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())