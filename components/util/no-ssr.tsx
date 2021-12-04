import { useEffect, useState } from 'react';

type NoSsrProps = {
    children: JSX.Element
}

function NoSSR(props: NoSsrProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? props.children : null;
}

export { NoSSR };

