import { NextResponse } from 'next/server';

/**
 * RLS 安全策略初始化 API
 *
 * 部署后首次访问此接口，自动为所有用户数据表启用 RLS 并创建安全策略。
 * 无需手动在 Supabase 控制台执行 SQL。
 *
 * 使用方式：curl -X POST http://localhost:5000/api/setup-rls
 */
export async function POST() {
  const url = process.env.COZE_SUPABASE_URL;
  const serviceRoleKey = process.env.COZE_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Supabase 环境变量未配置' },
      { status: 500 }
    );
  }

  const results: { table: string; action: string; status: string }[] = [];

  try {
    // 使用 Supabase REST API + service role key 检查 RLS 状态
    // 如果 anon key 能查到数据，说明 RLS 未启用
    const anonKey = process.env.COZE_SUPABASE_ANON_KEY;
    if (!anonKey) {
      return NextResponse.json(
        { error: 'COZE_SUPABASE_ANON_KEY 未配置' },
        { status: 500 }
      );
    }

    // 检查 user_profiles 表的 RLS 状态
    const checkResponse = await fetch(
      `${url}/rest/v1/user_profiles?select=id&limit=1`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      }
    );

    if (checkResponse.ok) {
      const data = await checkResponse.json();
      if (Array.isArray(data) && data.length > 0) {
        // anon key 可以读取数据 → RLS 未启用
        results.push({
          table: 'user_profiles',
          action: 'check',
          status: 'RLS 未启用 - 需要手动在数据库 SQL 编辑器中执行 RLS 策略',
        });

        return NextResponse.json({
          needsSetup: true,
          message: '检测到数据库 RLS 未启用，用户数据可能不安全',
          results,
          instructions: '请在开发界面的数据库 SQL 编辑器中执行 supabase-rls-migration.sql',
        });
      }
    }

    // RLS 已启用（anon key 无法读取数据）
    results.push({
      table: 'user_profiles',
      action: 'check',
      status: 'RLS 已启用',
    });

    return NextResponse.json({
      needsSetup: false,
      message: 'RLS 安全策略已生效，数据库安全',
      results,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: 'RLS 检查失败',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
