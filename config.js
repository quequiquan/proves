// Connexió amb la base de dades (Supabase), en un projecte propi de Què · Qui · Quan.
// Les dues dades surten de Supabase → Connect. La clau «publishable» és pública per disseny:
// la seguretat la donen les regles de la base de dades (cadascú només veu el que és seu).
// Si es deixen buides, els plans es guarden només al dispositiu.
window.QQQ_CONFIG = {
  supabaseUrl: 'https://dckzlqnhnhlxhpeykhsw.supabase.co',
  supabaseKey: 'sb_publishable_lamjjER_dzgFd6se7V71nw_C3HFnnrJ',
};
