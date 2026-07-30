import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// ─────────────────────────────────────────────────────────────────────────────
// PHARAOH — ESLint Production Config
// قواعد صارمة للمشاريع الكبيرة والـ scaling
// ─────────────────────────────────────────────────────────────────────────────

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "*.config.js",
    "*.config.mjs",
    "*.config.ts",
    "public/**",
    "node_modules/**",
  ]),

  {
    rules: {

      // ════════════════════════════════════════════════════════════════════════
      // 🔴 TYPESCRIPT — صرامة الأنواع
      // ════════════════════════════════════════════════════════════════════════

      // بان الـ any الصريح — استخدم unknown أو generics
      "@typescript-eslint/no-explicit-any": "error",

      // بان @ts-ignore و @ts-nocheck — يعطلان الـ type checking كلها
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description", // مسموح مع تعليق يشرح السبب
          "ts-ignore": true,                            // محظور نهائياً
          "ts-nocheck": true,                           // محظور نهائياً
          "ts-check": false,
          minimumDescriptionLength: 10,
        },
      ],

      // محظور استخدام non-null assertion بدون سبب (!)
      "@typescript-eslint/no-non-null-assertion": "error",

      // محظور empty functions/interfaces بدون تعليق
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-empty-object-type": "error",

      // بان var — استخدم const/let فقط
      "@typescript-eslint/no-var-requires": "error",

      // محظور wrapper objects زي new String() أو new Number()
      "@typescript-eslint/no-wrapper-object-types": "error",

      // استخدم type imports بدل value imports للأنواع
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // ملاحظة: consistent-type-exports محتاج typed linting — ممكن تفعّلها لاحقاً
      // "@typescript-eslint/consistent-type-exports": "error",

      // محظور استخدام require() في TypeScript — استخدم import
      "@typescript-eslint/no-require-imports": "error",

      // محظور functions بدون return type واضح (للـ consistency)
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,           // arrow functions في variables مسموحة
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],

      // محظور exported functions بدون types صريحة
      "@typescript-eslint/explicit-module-boundary-types": [
        "warn",
        { allowArgumentsExplicitlyTypedAsAny: false },
      ],

      // ════════════════════════════════════════════════════════════════════════
      // 🟠 CODE QUALITY — جودة الكود
      // ════════════════════════════════════════════════════════════════════════

      // محظور var — استخدم let أو const
      "no-var": "error",

      // استخدم const دائماً لو المتغير مش بيتغير
      "prefer-const": "error",

      // محظور console.log في الـ production code
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // محظور debugger statements
      "no-debugger": "error",

      // محظور alert, confirm, prompt
      "no-alert": "error",

      // محظور eval() — ثغرة أمنية كبيرة
      "no-eval": "error",
      "no-implied-eval": "error",

      // محظور new Function() — نفس خطورة eval
      "no-new-func": "error",

      // محظور تعديل built-in prototypes
      "no-extend-native": "error",

      // محظور unused variables
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",      // _param مسموح للـ intentional ignore
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // محظور shadow variables (تعريف متغير نفس اسم متغير في scope أعلى)
      "@typescript-eslint/no-shadow": "error",

      // محظور magic numbers — استخدم named constants
      "no-magic-numbers": "off", // صعب في Next.js/React — نتركه off

      // محظور duplicate imports
      "no-duplicate-imports": "error",

      // محظور useless return
      "no-useless-return": "error",

      // محظور return await زيادة عن اللزوم (بدون type info)
      "no-return-await": "error",

      // ════════════════════════════════════════════════════════════════════════
      // 🟡 REACT — قواعد React و Next.js
      // ════════════════════════════════════════════════════════════════════════

      // محظور <img> مباشرة — استخدم next/image
      "@next/next/no-img-element": "error",

      // محظور <a> مباشرة للـ internal links — استخدم next/link
      "@next/next/no-html-link-for-pages": "error",

      // محظور sync scripts في _document
      "@next/next/no-sync-scripts": "error",

      // محظور استخدام React بدون import في files قديمة
      "react/react-in-jsx-scope": "off", // Next.js 13+ مش محتاجها

      // لازم كل props تكون typed
      "react/prop-types": "off", // TypeScript بيعوضها

      // محظور nested components (بيسبب re-render مشاكل)
      "react/no-unstable-nested-components": ["error", { allowAsProps: false }],

      // محظور array index كـ key
      "react/no-array-index-key": "warn",

      // محظور strings مباشرة في JSX بدون escape
      "react/no-unescaped-entities": "off",

      // محظور dangerouslySetInnerHTML
      "react/no-danger": "error",

      // محظور deprecated lifecycle methods
      "react/no-deprecated": "error",

      // محظور setState في componentDidUpdate بدون condition
      "react/no-did-update-set-state": "error",

      // لازم كل hooks تكون في top level
      "react-hooks/rules-of-hooks": "error",

      // exhaustive deps في useEffect
      "react-hooks/exhaustive-deps": "error",

      // محظور self-closing tags بدون سبب
      "react/self-closing-comp": ["error", { component: true, html: false }],

      // ════════════════════════════════════════════════════════════════════════
      // 🟢 IMPORTS — تنظيم الـ imports
      // ════════════════════════════════════════════════════════════════════════

      // محظور import من node_modules محذوفة أو غير موجودة
      "import/no-extraneous-dependencies": "error",

      // محظور circular imports — بتكسر الـ tree shaking وبتسبب memory leaks
      "import/no-cycle": "warn",

      // محظور استيراد نفس الـ module أكتر من مرة
      "import/no-duplicates": "error",

      // محظور default export لملفات components — الـ named exports أوضح
      // "import/no-default-export": "warn", // Next.js بيحتاج default exports للـ pages

      // ════════════════════════════════════════════════════════════════════════
      // ♿ ACCESSIBILITY — إمكانية الوصول
      // ════════════════════════════════════════════════════════════════════════

      // لازم images تحتوي على alt text
      "jsx-a11y/alt-text": "error",

      // محظور onClick على divs بدون keyboard handler
      "jsx-a11y/click-events-have-key-events": "warn",

      // لازم interactive elements تكون accessible
      "jsx-a11y/no-noninteractive-element-interactions": "warn",

      // ════════════════════════════════════════════════════════════════════════
      // 🔵 SECURITY — الأمان
      // ════════════════════════════════════════════════════════════════════════

      // محظور dangerouslySetInnerHTML بدون sanitization
      "react/no-danger-with-children": "error",

      // محظور javascript: في href
      "no-script-url": "error",

      // محظور __proto__
      "no-proto": "error",

      // ════════════════════════════════════════════════════════════════════════
      // ⚡ PERFORMANCE — الأداء
      // ════════════════════════════════════════════════════════════════════════

      // محظور object spread في render بدون مبرر — بيسبب re-renders
      // (managed by exhaustive-deps و no-unstable-nested-components)

      // محظور unnecessary fragments
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
    },
  },
]);

export default eslintConfig;
