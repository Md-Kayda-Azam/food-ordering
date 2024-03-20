import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function EditableImage({ link, setLink }) {

  const [fileLink, setFileLink] = useState(link ? link : "");

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', "n9gejqgm");

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dhj6mwqcf/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const data = await response.json();
        setLink(data.secure_url);
        setFileLink(data.secure_url);
        console.log(data.secure_url);

        toast.success('Upload complete');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Upload error');
      }
    }
  }

  return (
    <>
      {fileLink && (
        <Image className="rounded-lg w-full h-full mb-1" src={fileLink} width={250} height={250} alt="avatar" />
      )}
      {!fileLink && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}
