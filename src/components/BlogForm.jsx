import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import RTE from './RTE';
import service from '../Appwrite/service';
import Loader from './Loader';
import imageCompression from 'browser-image-compression';

const BlogForm = ({ blog }) => {
    const { register, handleSubmit, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: blog?.title || '',
            content: blog?.content || '',
        }
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (data) => {
        setLoading(true);
        let fileId = blog?.blogImage || undefined;

        try {
            if (data.image && data.image[0]) {
                const originalFile = data.image[0];
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1000,
                    useWebWorker: true,
                };

                try {
                    const compressedBlob = await imageCompression(originalFile, options);
                    const compressedFile = new File(
                        [compressedBlob],
                        originalFile.name,
                        { type: originalFile.type, lastModified: Date.now() }
                    );
                    const uploadedFile = await service.uploadFile(compressedFile);
                    fileId = uploadedFile.$id;
                } catch (error) {
                    console.error("Image compression or upload failed:", error);
                    return;
                }
            }

            if (blog) {
                if (fileId && blog.blogImage && fileId !== blog.blogImage) {
                    await service.deleteFile(blog.blogImage);
                }
                const updatedBlog = await service.updateBlog(blog.$id, {
                    ...data,
                    blogImage: fileId
                });
                navigate(`/blog/${updatedBlog.$id}`);
            } else {
                const newBlog = await service.createBlog({
                    ...data,
                    blogImage: fileId
                });
                navigate(`/blog/${newBlog.$id}`);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: 'Title is required' })}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
                {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content.message}</p>
                )}
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Blog Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', {
                        required: !blog ? 'Image is required' : false,
                    })}
                />
                {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
                {blog && blog.blogImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(blog.blogImage)}
                            alt={blog.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Button type="submit" className="w-full flex items-center justify-center gap-3">
                    {blog ? "Update" : "Submit"}
                    {loading && <Loader />}
                </Button>
            </div>
        </form>
    );
};

export default BlogForm;
