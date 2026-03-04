"use client";

import { AppShell } from "@/components/app-shell";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function FotosPage() {
  const [status, setStatus] = useState("Upload een foto voor een taak of object.");
  const [preview, setPreview] = useState<string | null>(null);

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setPreview(URL.createObjectURL(file));

    if (!storage) {
      setStatus("Firebase Storage niet actief. Voorbeeld lokaal geladen.");
      return;
    }

    try {
      const fileRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setStatus(`Upload gelukt: ${url}`);
    } catch {
      setStatus("Upload mislukt.");
    }
  };

  return (
    <AppShell>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Foto upload</h2>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <p className="text-sm text-neutral-700">{status}</p>
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={640}
            height={360}
            unoptimized
            className="max-h-64 w-auto rounded-md border border-neutral-200"
          />
        ) : null}
      </section>
    </AppShell>
  );
}