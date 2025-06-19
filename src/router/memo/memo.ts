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

router.post("/body", async (c) => {
  // const : 변경 불가능
  const body = await c?.req?.json();
  let name = body?.name ?? "";
  const dummy1Repo = AppDataSource.getRepository(TDummy1);
  // 메모리에다가 데이터 새로 만듬
  let newDummy = new TDummy1();
  newDummy.name = name;
  // DB 에 진짜 저장하고난후, 진짜 db에 저장된 데이터 퉤 뱉어짐. 이걸 newDummy 에 다시 담아서
  // 데이터 갱신시킴
  newDummy = await dummy1Repo.save(newDummy);
  return c.json({ newDummy });
});

export default router;
