/**
 * 이건 내가 만든 라우터. 이걸 서버가 사용하게 하려면 등록을 시켜줘야함
 */

import { Hono } from "hono";
import { AppDataSource } from "../../data-source";
import { TDummy1 } from "../../entities/TDummy1";
import { TMemo } from "../../entities/TMemo";

const router = new Hono();

router.get("/list", async (c) => {
  let result: { success: boolean; data: any; code: string; message: string } = {
    success: true,
    code: "",
    data: null,
    message: ``,
  };
  try {
    const memoRepo = AppDataSource.getRepository(TMemo);
    let memos =
      (await memoRepo.find({ take: 1000, order: { createdDt: "DESC" } })) ?? [];
    result.data = memos;
    return c.json(result);
  } catch (error: any) {
    result.success = false;
    result.message = error?.message ?? "";
    return c.json(result);
  }
});

router.post("/upsert", async (c) => {
  let result: { success: boolean; data: any; code: string; message: string } = {
    success: true,
    code: "",
    data: null,
    message: ``,
  };
  try {
    // const : 변경 불가능
    const body = await c?.req?.json();
    let title = String(body?.title ?? "");
    title = title?.trim();
    let content = String(body?.content ?? "");
    content = content?.trim();

    if (!title || !content) {
      result.success = false;
      result.message = "제목이나 내용을 입력해주세요";
      return c.json(result);
    }

    return c.json(result);
  } catch (error: any) {
    result.success = false;
    result.message = error?.message ?? "";
    return c.json(result);
  }
});

export default router;
