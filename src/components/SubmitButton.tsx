'use client';

import SubmitBack from './submitButton/SubmitBack';
import SubmitOrder from './submitButton/SubmitOrder';
import SubmitRequest from './submitButton/SubmitRequest';

type SubmitBtn = 'back' | 'order' | 'request';

export default function SubmitButton({ type }: { type: SubmitBtn }) {
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
