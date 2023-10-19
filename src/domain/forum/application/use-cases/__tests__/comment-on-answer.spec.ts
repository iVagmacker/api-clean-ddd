import { InMemoryAnswersCommentsRepository } from 'test/repositories/in-memory-answer-comments-repositoy'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { expect } from 'vitest'
import { CommentOnAnswerUseCase } from '../comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswersCommentsRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswersAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswersAttachmentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswersCommentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    )

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
