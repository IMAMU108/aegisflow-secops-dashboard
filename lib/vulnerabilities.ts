export type Severity = "Critical" | "High" | "Medium" | "Low"

export interface Vulnerability {
  id: string
  name: string
  severity: Severity
  path: string
  target: string
  cwe: string
  summary: string
  patches: {
    node: string
    laravel: string
  }
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: "vuln-sqli",
    name: "Unsanitized Input Reflection (SQLi)",
    severity: "Critical",
    path: "/api/v1/users/profile?id=",
    target: "Target-App-Sandbox",
    cwe: "CWE-89",
    summary:
      "The `id` query parameter is concatenated directly into a SQL statement, allowing arbitrary query manipulation and data exfiltration.",
    patches: {
      node: `import { query, validationResult } from "express-validator"
import { db } from "../db"

// Validate & sanitize the incoming parameter
export const validateProfileId = [
  query("id")
    .exists().withMessage("id is required")
    .isInt({ min: 1 }).withMessage("id must be a positive integer")
    .toInt(),
]

router.get("/api/v1/users/profile", validateProfileId, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Parameterized query — no string concatenation
  const { id } = req.query
  const rows = await db.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id],
  )
  res.json(rows[0] ?? null)
})`,
      laravel: `<?php
// routes/web.php
Route::get('/api/v1/users/profile', function (Request $request) {
    $validated = $request->validate([
        'id' => ['required', 'integer', 'min:1'],
    ]);

    // Eloquent uses bound parameters automatically
    $user = User::select('id', 'name', 'email')
        ->findOrFail($validated['id']);

    return response()->json($user);
});`,
    },
  },
  {
    id: "vuln-xss",
    name: "Stored Cross-Site Scripting (XSS)",
    severity: "High",
    path: "/dashboard/comments/submit",
    target: "Target-App-Sandbox",
    cwe: "CWE-79",
    summary:
      "User-submitted comment bodies are persisted and later rendered without output encoding, permitting persistent script injection.",
    patches: {
      node: `import { body, validationResult } from "express-validator"
import createDOMPurify from "dompurify"
import { JSDOM } from "jsdom"

const DOMPurify = createDOMPurify(new JSDOM("").window)

export const validateComment = [
  body("content")
    .isString()
    .trim()
    .isLength({ min: 1, max: 2000 })
    .customSanitizer((value) => DOMPurify.sanitize(value)),
]

router.post("/dashboard/comments/submit", validateComment, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  // req.body.content is now sanitized HTML
  res.status(201).json({ ok: true })
})`,
      laravel: `<?php
$validated = $request->validate([
    'content' => ['required', 'string', 'max:2000'],
]);

// Purify before storing
$clean = clean($validated['content']); // mews/purifier
Comment::create(['content' => $clean]);

// In Blade, always escape on output:
// {{ $comment->content }}  — never {!! !!}`,
    },
  },
  {
    id: "vuln-jwt",
    name: "Weak JWT Token Signing Key (None Algorithm Allowed)",
    severity: "Critical",
    path: "Authorization Header (Bearer)",
    target: "Corporate-Staging-API",
    cwe: "CWE-347",
    summary:
      "The verifier accepts the `none` algorithm and unpinned algorithms, allowing forged tokens to bypass signature verification.",
    patches: {
      node: `import jwt from "jsonwebtoken"

export function verifyToken(token: string) {
  // Explicitly pin the algorithm — reject "none"
  return jwt.verify(token, process.env.JWT_SECRET!, {
    algorithms: ["HS256"],
    issuer: "aegisflow",
    maxAge: "15m",
  })
}

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization ?? ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: "Missing token" })
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
}`,
      laravel: `<?php
// config/jwt.php (tymon/jwt-auth)
return [
    'secret' => env('JWT_SECRET'),
    'algo'   => 'HS256', // pin algorithm, never 'none'
    'ttl'    => 15,
];

// Middleware
public function handle($request, Closure $next)
{
    try {
        JWTAuth::parseToken()->authenticate();
    } catch (\\Exception $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
    return $next($request);
}`,
    },
  },
  {
    id: "vuln-hsts",
    name: "Missing HTTP Strict-Transport-Security (HSTS)",
    severity: "Low",
    path: "Root Domain Header Response",
    target: "Target-App-Sandbox",
    cwe: "CWE-319",
    summary:
      "Responses omit the Strict-Transport-Security header, leaving clients vulnerable to protocol downgrade and SSL-stripping attacks.",
    patches: {
      node: `import helmet from "helmet"

app.use(
  helmet.hsts({
    maxAge: 63072000,      // 2 years
    includeSubDomains: true,
    preload: true,
  }),
)

// Or set manually:
app.use((_, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  )
  next()
})`,
      laravel: `<?php
// app/Http/Middleware/SecurityHeaders.php
public function handle($request, Closure $next)
{
    $response = $next($request);

    $response->headers->set(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
    );

    return $response;
}`,
    },
  },
]
