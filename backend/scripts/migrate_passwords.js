/**
 * Script de migración: Hashear contraseñas existentes con bcrypt.
 * 
 * Ejecutar UNA SOLA VEZ antes de desplegar la nueva versión:
 *   node scripts/migrate_passwords.js
 * 
 * El script detecta contraseñas ya hasheadas ($2b$) y las salta,
 * por lo que es seguro ejecutarlo múltiples veces.
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const bcrypt = require("bcrypt");
const db = require("../src/config/db");

const SALT_ROUNDS = 10;

async function migratePasswords() {
    const pool = db.promise();

    console.log("=== Migración de contraseñas a bcrypt ===\n");

    // --- Migrar alumnos ---
    const [alumnos] = await pool.query(
        "SELECT id, idsenati, password_alumno FROM datos_alumnos WHERE password_alumno IS NOT NULL"
    );
    console.log(`Encontrados ${alumnos.length} alumnos para revisar`);

    let alumnosMigrados = 0;
    for (const alumno of alumnos) {
        if (alumno.password_alumno && alumno.password_alumno.startsWith("$2b$")) {
            console.log(`  [SKIP] Alumno ${alumno.idsenati}: ya hasheado`);
            continue;
        }
        const hash = await bcrypt.hash(alumno.password_alumno, SALT_ROUNDS);
        await pool.query("UPDATE datos_alumnos SET password_alumno = ? WHERE id = ?", [hash, alumno.id]);
        console.log(`  [OK]   Alumno ${alumno.idsenati}: migrado`);
        alumnosMigrados++;
    }

    // --- Migrar vigilantes ---
    const [vigilantes] = await pool.query(
        "SELECT id, guardia_id, password_vigilante FROM vigilante WHERE password_vigilante IS NOT NULL"
    );
    console.log(`\nEncontrados ${vigilantes.length} vigilantes para revisar`);

    let vigilantesMigrados = 0;
    for (const vig of vigilantes) {
        if (vig.password_vigilante && vig.password_vigilante.startsWith("$2b$")) {
            console.log(`  [SKIP] Vigilante ${vig.guardia_id}: ya hasheado`);
            continue;
        }
        const hash = await bcrypt.hash(vig.password_vigilante, SALT_ROUNDS);
        await pool.query("UPDATE vigilante SET password_vigilante = ? WHERE id = ?", [hash, vig.id]);
        console.log(`  [OK]   Vigilante ${vig.guardia_id}: migrado`);
        vigilantesMigrados++;
    }

    console.log(`\n=== Migración completada ===`);
    console.log(`  Alumnos migrados:    ${alumnosMigrados}/${alumnos.length}`);
    console.log(`  Vigilantes migrados: ${vigilantesMigrados}/${vigilantes.length}`);
    process.exit(0);
}

migratePasswords().catch(err => {
    console.error("Error en migración:", err);
    process.exit(1);
});
