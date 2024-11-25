import { useContext, useEffect, useState } from 'react';
import { inputsContext } from './Context';
import { useSession } from 'next-auth/react';

export default function CurrentUser() {
  const {
    profile_image,
    state: { rerender },
  } = useContext(inputsContext);

  const [user, setUser] = useState();
  const { data: session, status } = useSession();
  // console.log('profile_image?.image', profile_image?.image);

  useEffect(() => {
    if (status === 'authenticated') {
      getUserData();
    }
    console.log('rerender');
  }, [status, profile_image?.image, rerender]);

  async function getUserData() {
    if (session) {
      const email = session?.user?.email;
      // console.log('email', email);
      const response = await fetch(`/api/user?email=${email}`);
      const json = await response?.json();
      // console.log('json', json);
      if (response.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('CurrentUser', JSON.stringify(json[0]));
        }

        setUser(json[0]);
      }
    }
  }

  return { ...user };
}
