import React from 'react'

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../components/AppBar'
import { categories } from '../utils/categories'

function Categories() {

  return (
    <div>
      <AppBar />
      <CssBaseline />
      {categories.map((val) => (
        <Grid key={val.value}>
          {val.icon ? val.icon :
            <Link href={"/category/" + val.value} variant="body2">
              {val.value}
            </Link>
          }
        </Grid>

      ))}
    </div>

  )
}

export default Categories