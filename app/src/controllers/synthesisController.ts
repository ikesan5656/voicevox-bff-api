import {
  JsonController,
  Param,
  QueryParam,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseBefore,
  HttpCode,
  Res,
} from "routing-controllers";
import { checkJwt } from "../utils/auth0";
import { audioQuery } from "../api/voicevox/synthesis/endpoints/create-query";
import { synthesis } from "../api/voicevox/synthesis/endpoints/speech-synthesis";
import { Response } from "express";

@JsonController()
@UseBefore(checkJwt)
export class SynthesisController {
  @Post("/talk_synthesis")
  @HttpCode(200)
  async talkSynthesis(
    @QueryParam("speaker") speaker: number,
    @QueryParam("text") text: string,
    @Res() response: Response
  ) {
    try {
      const audioQueryRes = await audioQuery({
        speaker: speaker,
        text: text,
      });

      const defaultAudioQuery = audioQueryRes.data;

      const res = await synthesis(
        defaultAudioQuery,
        { speaker: speaker },
        { responseType: "arraybuffer" }
      );

      const audioData = res.data as unknown as ArrayBuffer;

      // 3. レスポンスヘッダーの設定とバイナリの返却
      response.setHeader("Content-Type", "audio/wav");

      // Bufferに変換して送信
      return response.send(Buffer.from(audioData));
    } catch (err) {
      console.log(err);
    }
  }
}
