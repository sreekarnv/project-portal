import * as React from 'react';

const useLoading = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const startLoading = () => setIsLoading(true);
	const stopLoading = () => setIsLoading(false);

	return { isLoading, startLoading, stopLoading };
};

export default useLoading;
