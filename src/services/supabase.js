import { createClient } from "@supabase/supabase-js";


const supabaseUrl = `https://vxqbiqgahmiemokwuapk.supabase.co`;
const supabaseKey = 'sb_publishable_7pj8JuROWssQDhpCSNG_ng_OVma8Tkl'

const supabase = createClient(supabaseUrl, supabaseKey);
 
export default supabase;

export { supabaseUrl };