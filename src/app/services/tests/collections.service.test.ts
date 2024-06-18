import { describe, it, expect } from "vitest"
import { groupBy } from "../collections.service"

describe("Collections service test", () => {
  it("should return an empty object", () => {
    const arr: any[] = []
    const criteria = ''
    const expected_result = {}
    const result = groupBy({ arr, criteria })
    expect(result).toEqual(expected_result)
  })

  it("should return a grouped object from an array", () => {
    const arr: any[] = [
      {
        type: "odd",
        value: 1
      },
      {
        type: "even",
        value: 2
      },
      {
        type: "odd",
        value: 3
      },
      {
        type: "even",
        value: 4
      }
    ]
    const criteria = 'type'
    const expected_result = {
      odd: [
        {
          type: "odd",
          value: 1
        },
        {
          type: "odd",
          value: 3
        },
      ],
      even: [
        {
          type: "even",
          value: 2
        },
        {
          type: "even",
          value: 4
        },
      ]
    }
    const result = groupBy({ arr, criteria })
    expect(result).toEqual(expected_result)
  })

  it("should return a grouped object from an array with a function criteria", () => {
    const arr: any[] = [
      {
        type: "odd",
        value: 1
      },
      {
        type: "even",
        value: 2
      },
      {
        type: "odd",
        value: 3
      },
      {
        type: "even",
        value: 4
      }
    ]
    const criteria = (item: { type: string }) => item.type
    const expected_result = {
      odd: [
        {
          type: "odd",
          value: 1
        },
        {
          type: "odd",
          value: 3
        },
      ],
      even: [
        {
          type: "even",
          value: 2
        },
        {
          type: "even",
          value: 4
        },
      ]
    }
    const result = groupBy({ arr, criteria })
    expect(result).toEqual(expected_result)
  })
})