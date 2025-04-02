import { createClient } from "@supabase/supabase-js";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoY3hzb2dkY3BhcG1neGR6aXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NDc3ODcsImV4cCI6MjA1NDAyMzc4N30.zFr9N0MBb5W_9GMbX7ljWF62S7JQhGFwi5U40hqB2iA";

const url = "https://ahcxsogdcpapmgxdzixu.supabase.co";

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }
    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];

    const timestamp = new Date().getTime();

    fileName = timestamp +file.name+ "." + extension;

    supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    }).then(()=>{
      const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
      resolve(publicUrl);
    }).catch((err)=>{
      reject(err);
    });
  });
}


