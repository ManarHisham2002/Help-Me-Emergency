import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
    const [diseases, setDiseases] = useState({
        loading: true,
        dataDiseases: [],
        err: null,
    });

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                setDiseases({ ...diseases, loading: true });
                const response = await axios.get('http://localhost:4121/api/diseases/all');
                setDiseases({ dataDiseases: response.data, err: null, loading: false });
                if (response.data.length > 0) {
                    setSelectedCategory(response.data[0].name);
                }
            } catch (error) {
                setDiseases({ ...diseases, loading: false, err: error.response?.data?.errors });
            }
        };

        fetchDiseases();
    }, []);

    const [posts, setPosts] = useState({
        loading: true,
        dataPosts: [],
        err: null,
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setPosts({ ...posts, loading: true });
                const response = await axios.get('http://localhost:4121/posts');
                setPosts({ dataPosts: response.data, err: null, loading: false });
            } catch (error) {
                setPosts({ ...posts, loading: false, err: error.response?.data?.errors });
            }
        };

        fetchPosts();
    }, []);

    const [patient, setPatient] = useState({
        loading: true,
        dataPatient: {},
        err: null,
    });

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                setPatient({ ...patient, loading: true });
                const response = await axios.get('http://localhost:4121/api/patient/id');
                setPatient({ dataPatient: response.data, err: null, loading: false });
            } catch (error) {
                setPatient({ ...patient, loading: false, err: error.response?.data?.errors });
            }
        };

        fetchPatient();
    }, []);

    const currentUser = {
        name: patient.dataPatient.name || '',
        photo: patient.dataPatient.photo || '',
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleAddPost = async (content) => {
        const newPost = {
            content,
            category: selectedCategory,
            author: {
                name: currentUser.name,
                photo: currentUser.photo,
                createdAt: new Date().toISOString(),
            },
            comments: [],
        };

        try {
            const response = await axios.post('http://localhost:4121/post/create', newPost);
            setPosts((prevPosts) => ({
                ...prevPosts,
                dataPosts: [...prevPosts.dataPosts, response.data],
            }));
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleAddComment = async (postId, comment) => {
        const newComment = {
            postId,
            comment,
            author: {
                name: currentUser.name,
                photo: currentUser.photo,
                createdAt: new Date().toISOString(),
            },
        };

        try {
            const response = await axios.post(`http://localhost:4121/comment/add/${postId}`, newComment);
            setPosts((prevPosts) => ({
                ...prevPosts,
                dataPosts: prevPosts.dataPosts.map((post) =>
                    post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
                ),
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const filteredPosts = posts.dataPosts.filter((post) => post.category === selectedCategory);

    return (
        <div className='container chat'>
            <div className='sidebar'>
                <div className='side-wrapper'>
                    <div className='side-menu'>
                        {diseases.dataDiseases.map((item) => (
                            <p
                                key={item.name}
                                className={`sidebar-link discover 
                                    ${selectedCategory === item.name ? 'is-active' : ''}`}
                                onClick={() => handleCategoryClick(item.name)}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='wrapper'>
                <div className='content'>
                    <div className='group'>
                        <div className='posts'>
                            {posts.dataPosts.map((item) => (
                                <div key={item.id} className='post'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='user d-flex flex-row align-items-center'>
                                            <img src={item.author.photo} width='30' 
                                                className='user-img rounded-circle mr-2' alt={item.author.name} />
                                            <span>
                                                <small className='font-weight-bold text-primary'>{item.author.name}</small>
                                                <small className='font-weight-bold'>{item.content}</small>
                                            </span>
                                        </div>
                                        <small>{new Date(item.author.createdAt).toLocaleString()}</small>
                                    </div>
                                    {item.comments.map((info) => (
                                        <div key={info.id} className='comments'>
                                            <div className='card p-3'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div className='user d-flex flex-row align-items-center'>
                                                        <img src={info.author.photo} width='30' 
                                                            className='user-img rounded-circle mr-2' 
                                                                alt={info.author.name} />
                                                        <span>
                                                            <small className='font-weight-bold text-primary'>
                                                                {info.author.name}</small>
                                                            <small className='font-weight-bold'>{info.comment}</small>
                                                        </span>
                                                    </div>
                                                    <small>{new Date(info.createdAt).toLocaleString()}</small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='form'>
                                        <input
                                            type='text'
                                            name='text'
                                            autoComplete='off'
                                            required
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddComment(item.id, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        <label htmlFor='text' className='label-name'>
                                            <span className='content-name'></span>
                                        </label>
                                        <button type='button' className='arrow-btn'>
                                            <FontAwesomeIcon icon={faCircleChevronRight} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='new-post-form'>
                            <input
                                type='text'
                                name='new-post'
                                autoComplete='off'
                                placeholder='Add a new post...'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddPost(e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;