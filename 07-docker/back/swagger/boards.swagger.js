/**
 * @swagger
 * /boards:
 *   get:
 *     summary: 게시판 전체 조회
 *     parameters:
 *          - in: query
 *            name: number
 *            type: int
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          id:
 *                              type: int
 *                              example: 1
 *                          user:
 *                              type: string
 *                              example: 서나
 *                          title:
 *                              type: string
 *                              example: 서나짱
 *                          contents:
 *                              type: string
 *                              example: 내용
 */

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: 게시글 등록하기
 *     responses:
 *         200:
 *             description: 성공
 */
