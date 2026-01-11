export const comments = [
    {
        id: 1,
        author: 'Emily Turner',
        avatar: '/images/comment-1.jpg',
        rating: 5,
        date: '12 Apr, 2022',
        text: "Great article! I've been looking for a comprehensive guide on full-body workouts and this really delivers. I especially appreciate the detailed breakdown of each exercise. Keep up the excellent work!"
    },
    {
        id: 2,
        author: 'Michael Chen',
        avatar: '/images/comment-2.jpg',
        rating: 5,
        date: '15 Apr, 2022',
        text: "This is exactly what I needed! The step-by-step instructions are clear and easy to follow. I've already started incorporating these workouts into my routine. Thank you for sharing your expertise!"
    }
];

// Simulating API call
export const fetchComments = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(comments);
        }, 800);
    });
};
