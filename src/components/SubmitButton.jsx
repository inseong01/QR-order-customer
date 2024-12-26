'use client';

import SubmitBack from './submitButton/SubmitBack';
import SubmitOrder from './submitButton/SubmitOrder';
import SubmitRequest from './submitButton/SubmitRequest';

export default function SubmitButton({ type }) {
  switch (type) {
    case 'back': {
      return <SubmitBack />;
    }
    case 'order': {
      return <SubmitOrder />;
    }
    case 'request': {
      return <SubmitRequest />;
    }
  }
}
