# TerraLog

Aplicación móvil para el registro y seguimiento de procesos de compostaje. Permite documentar cada lote con fotos, mediciones ambientales y observaciones, almacenando todo en la nube con sincronización en tiempo real.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos](#modelo-de-datos)
- [Requisitos previos](#requisitos-previos)
- [Instalación y configuración](#instalación-y-configuración)
- [Ejecución](#ejecución)
- [Build de producción](#build-de-producción)
- [Permisos de la aplicación](#permisos-de-la-aplicación)
- [Backend (Supabase)](#backend-supabase)
- [Contribuir](#contribuir)

---

## Descripción

**TerraLog** es una aplicación Flutter orientada a técnicos y operadores de plantas de compostaje. Cada registro documenta un lote de compostaje con:

- Foto de inicio del proceso
- Mediciones: temperatura, humedad, peso de materia orgánica y volumen de material estructurante
- Observaciones libres y campo de notas adicionales
- Foto final del producto terminado (se puede añadir posteriormente)

Los registros se almacenan en una base de datos PostgreSQL gestionada por Supabase y las imágenes en Supabase Storage, todo asociado al usuario autenticado.

---

## Características

| Funcionalidad | Descripción |
|---|---|
| Autenticación | Login con email y contraseña via Supabase Auth |
| Listado de registros | Vista principal con tarjetas y estado (Completo / En curso) |
| Nuevo registro | Formulario con foto de inicio, mediciones y observaciones |
| Detalle de registro | Vista completa con todas las mediciones y fotos |
| Foto final | Posibilidad de añadir foto final a registros en curso |
| Visor de fotos | Visualización en pantalla completa con zoom |
| Captura de imagen | Cámara del dispositivo o galería |
| Pull-to-refresh | Recarga manual de la lista de registros |
| Cierre de sesión | Logout desde la pantalla principal |

---

## Arquitectura

TerraLog sigue un patrón **MVVM ligero con capa de servicio**:

```
┌─────────────────────────────────────────┐
│               UI / Screens              │
│  LoginScreen, HomeScreen,               │
│  NewRecordScreen, RecordDetailScreen    │
└───────────────────┬─────────────────────┘
                    │ llama a
┌───────────────────▼─────────────────────┐
│            SupabaseService              │
│  Métodos estáticos para auth, CRUD      │
│  y carga de imágenes                    │
└───────────────────┬─────────────────────┘
                    │ usa
┌───────────────────▼─────────────────────┐
│              Supabase BaaS              │
│  PostgreSQL · Auth · Storage            │
└─────────────────────────────────────────┘
```

### Flujo de navegación

```
_AuthGate (escucha el estado de autenticación)
├── LoginScreen          → HomeScreen (login exitoso)
└── HomeScreen
    ├── NewRecordScreen  → HomeScreen (tras guardar)
    └── RecordDetailScreen
        └── _FullscreenPhoto (al tocar una foto)
```

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| [Flutter](https://flutter.dev) | ^3.12.0 | Framework UI multiplataforma |
| [Dart](https://dart.dev) | ^3.12.0 | Lenguaje de programación |
| [Supabase Flutter](https://pub.dev/packages/supabase_flutter) | ^2.5.0 | Backend: auth, base de datos y storage |
| [image_picker](https://pub.dev/packages/image_picker) | ^1.1.2 | Captura de imagen desde cámara o galería |
| [intl](https://pub.dev/packages/intl) | ^0.19.0 | Formateo de fechas y localización |
| [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons) | ^0.14.3 | Generación del icono de la app |

**Backend:** [Supabase](https://supabase.com) (PostgreSQL + Auth + Storage)

---

## Estructura del proyecto

```
TerraLog/
├── lib/
│   ├── main.dart                     # Punto de entrada, inicialización de Supabase y AuthGate
│   ├── models/
│   │   └── registro.dart             # Modelo de datos Registro
│   ├── screens/
│   │   ├── login_screen.dart         # Pantalla de inicio de sesión
│   │   ├── home_screen.dart          # Listado de registros
│   │   ├── new_record_screen.dart    # Formulario de nuevo registro
│   │   └── record_detail_screen.dart # Detalle de un registro
│   └── services/
│       └── supabase_service.dart     # Capa de acceso a Supabase
├── assets/
│   └── TerraLog.png                  # Icono de la aplicación
├── android/                          # Configuración nativa Android
├── pubspec.yaml                      # Dependencias y assets
└── analysis_options.yaml             # Reglas de análisis estático
```

---

## Modelo de datos

### Clase `Registro`

```dart
class Registro {
  final String id;                    // UUID generado por Supabase
  final DateTime createdAt;           // Fecha y hora de creación
  final String? fotoInicio;           // URL pública de la foto inicial
  final double? temperatura;          // Temperatura en °C
  final double? humedad;              // Humedad en %
  final double? kgMateriaOrganica;    // Peso de materia orgánica en kg
  final double? volumenEstructurante; // Volumen de material estructurante en m³
  final String? fotoFinal;            // URL pública de la foto final (nullable)
  final String? observaciones;        // Observaciones del proceso
  final String? otros;                // Notas adicionales
  final String userId;                // UUID del usuario propietario
}
```

### Tabla en Supabase (`registros`)

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid` PK | Identificador único |
| `created_at` | `timestamptz` | Fecha de creación |
| `foto_inicio` | `text` | URL de la foto de inicio |
| `temperatura` | `numeric` | Temperatura (°C) |
| `humedad` | `numeric` | Humedad (%) |
| `kg_materia_organica` | `numeric` | Peso materia orgánica (kg) |
| `volumen_estructurante` | `numeric` | Volumen estructurante (m³) |
| `foto_final` | `text` | URL de la foto final |
| `observaciones` | `text` | Observaciones del proceso |
| `otros` | `text` | Notas adicionales |
| `user_id` | `uuid` FK | Referencia a `auth.users` |

### Storage

- **Bucket:** `fotos`
- **Ruta de archivo:** `{userId}/{userId}_{timestamp}.{extensión}`

---

## Requisitos previos

- [Flutter SDK](https://docs.flutter.dev/get-started/install) `>=3.12.0`
- [Android Studio](https://developer.android.com/studio) o VS Code con extensión Flutter
- Java 17 (para compilación Android)
- Cuenta en [Supabase](https://supabase.com) con el proyecto configurado (ver sección [Backend](#backend-supabase))
- Dispositivo Android (API 21+) o emulador

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/terralog.git
cd terralog
```

### 2. Instalar dependencias

```bash
flutter pub get
```

### 3. Configurar las credenciales de Supabase

En `lib/main.dart`, localiza la inicialización de Supabase y reemplaza con los valores de tu proyecto:

```dart
await Supabase.initialize(
  url: 'https://TU_PROYECTO.supabase.co',
  anonKey: 'TU_ANON_KEY',
);
```

> **Nota de seguridad:** Para producción, mueve las credenciales a variables de entorno o a un archivo de configuración excluido del control de versiones.

---

## Ejecución

```bash
# Modo debug (con hot reload)
flutter run

# Especificar dispositivo
flutter run -d <device_id>

# Listar dispositivos disponibles
flutter devices
```

---

## Build de producción

```bash
# APK de release
flutter build apk --release

# Android App Bundle (recomendado para Google Play)
flutter build appbundle --release
```

> **Importante:** Antes de publicar, configura un keystore de firma en `android/app/build.gradle.kts` y sustituye la configuración de debug signing actual por una de release.

---

## Permisos de la aplicación

La app declara los siguientes permisos en `AndroidManifest.xml`:

| Permiso | Motivo |
|---|---|
| `CAMERA` | Tomar fotos directamente desde la app |
| `READ_MEDIA_IMAGES` (API ≥ 33) | Seleccionar imágenes de la galería |
| `READ_EXTERNAL_STORAGE` (API < 33) | Seleccionar imágenes de la galería en Android antiguo |
| `INTERNET` | Comunicación con Supabase |

---

## Backend (Supabase)

### Configurar el proyecto

1. Crea un nuevo proyecto en [supabase.com](https://supabase.com).
2. En el **SQL Editor**, ejecuta el siguiente script para crear la tabla y habilitar la seguridad por fila (RLS):

```sql
create table public.registros (
  id                   uuid default gen_random_uuid() primary key,
  created_at           timestamptz default now() not null,
  foto_inicio          text,
  temperatura          numeric,
  humedad              numeric,
  kg_materia_organica  numeric,
  volumen_estructurante numeric,
  foto_final           text,
  observaciones        text,
  otros                text,
  user_id              uuid references auth.users(id) not null
);

-- Habilitar Row Level Security
alter table public.registros enable row level security;

-- Política: los usuarios solo ven sus propios registros
create policy "Los usuarios ven sus propios registros"
  on public.registros for select
  using (auth.uid() = user_id);

-- Política: los usuarios solo insertan con su propio user_id
create policy "Los usuarios insertan sus propios registros"
  on public.registros for insert
  with check (auth.uid() = user_id);

-- Política: los usuarios solo actualizan sus propios registros
create policy "Los usuarios actualizan sus propios registros"
  on public.registros for update
  using (auth.uid() = user_id);
```

3. En **Storage**, crea un bucket llamado `fotos` con acceso público para las URLs de las imágenes.
4. Copia la **URL del proyecto** y la **anon key** desde `Settings > API` y pégalas en `lib/main.dart`.

---

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m "feat: añadir nueva funcionalidad"`
4. Sube la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
