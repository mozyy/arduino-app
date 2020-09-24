import React from 'react';
import Link, { LinkTypeMap } from '@material-ui/core/Link';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import {
  Link as RouterLink,
} from 'react-router-dom';

const LinkRouter = (props: OverrideProps<LinkTypeMap, RouterLink>) => (
  <Link component={RouterLink} {...props}> </Link>
);

export default LinkRouter;
