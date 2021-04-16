import React from 'react'
import {render} from '@testing-library/react'

import ProjectsTable from './projects-table'

function sum(x, y) {
    return x + y;
  }

describe('Projects Table', () => {

    test('Renders projects-table', () => {
       
        render(<ProjectsTable />)

    })

})