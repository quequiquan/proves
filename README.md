# Què · Qui · Quan

Agenda ràpida dels plans d'oci i socials: sopars, dinars, concerts, trobades, sortides, inauguracions…

- **Què**: el tipus de pla (18 de sèrie, editables a Ajustos)
- **Qui**: amb qui hi vas
- **Quan**: dia i hora

Cada pla es pot **compartir** (WhatsApp, missatges, correu…). Qui el rep obre un enllaç i el pot afegir
al seu calendari (iPhone, Google o Outlook) sense instal·lar res. Les dades del pla viatgen dins de l'enllaç
(després del `#`), no es guarden a cap servidor.

## Versions
- Compte propi de GitHub i de Supabase (separat de l'app de gravacions). Adreces: pendents de crear.
- La versió de proves (adreça amb «proves») guarda les dades a part.

## Instal·lar-la
- **iPhone:** obre l'adreça amb Safari → Compartir → Afegeix a la pantalla d'inici.
- **Ordinador:** a Chrome o Edge, icona d'instal·lar de la barra d'adreces.

## Comptes i compartir
Cada persona entra amb el seu correu i un codi que rep per correu (sense contrasenya), i només veu els seus plans.
Un pla es pot enviar a l'app d'altres persones pel seu correu: els surt com a invitació i poden dir «Hi vaig» / «No hi vaig».
Base de dades: `../supabase-que-qui-quan/esquema.sql` (s'executa a Supabase → SQL Editor). Les dades de connexió van a `config.js`.
A Supabase cal que les plantilles de correu «Magic Link» i «Confirm signup» incloguin el codi `{{ .Token }}`.

Quan canviïs fitxers, puja `VERSIO` a `sw.js`.
