import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storageService from "../appwrite/StorageService";
import databaseService from "../appwrite/DatabaseService";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "../Components/index";

export default function Post() {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor =
    post && userData ? post.userId === userData?.userData?.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService.getPostById(slug).then((post) => {
        if (post) {
          setPost(post);
          storageService
            .getFilePreview(post.featuredImage)
            .then((result) => setImage(result));
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img src={image} alt={post.title} className="rounded-xl" />
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">{parse(post.content)}</div>
    </div>
  ) : null;
}
