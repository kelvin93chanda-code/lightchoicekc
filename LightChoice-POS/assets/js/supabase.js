// =====================================
// SUPABASE CONFIG
// =====================================

const SUPABASE_URL = "https://wcvptgojjjebtirrtyzs.supabase.co/rest/v1/";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjdnB0Z29qamplYnRpcnJ0eXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MTUwMzEsImV4cCI6MjEwMTE5MTAzMX0.DuvE-GXhO6-KpqRUCnI4FwtxC3SgYbPA6Dq--duG1s8";


// Create client
const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

async function testSupabase(){

    const { data, error } = await supabaseClient
        .from("products")
        .select("*");

    if(error){

        console.error(error);
        alert("Connection failed");

    }else{

        console.log(data);
        alert("Supabase connected successfully");

    }

}