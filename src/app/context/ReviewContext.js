import React from 'react';

export const ReviewContext = React.createContext({});

const ReviewContextProvider = ({ children }) => {
	const [reviews, setReviews] = React.useState(null);

	React.useEffect(() => {
		(async () => {
			try {
				const res = await fetch('reviews.json', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await res.json();

				setReviews(data);
			} catch (err) {}
		})();
	}, []);

	return (
		<ReviewContext.Provider value={{ reviews }}>
			{children}
		</ReviewContext.Provider>
	);
};

export default ReviewContextProvider;
