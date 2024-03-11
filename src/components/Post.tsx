import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {
  // state = variáveis que eu quero que o componente monitore
  const [comments, setComments] = useState(['Post show de bola!']);
  const [newCommentText, setNewCommentText] = useState('');

   const publishDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR },
  );

  const publishDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event:FormEvent) {
    event.preventDefault();
    //const newCommentText = event.target.comment.value; Forma imperativa
    //imutabilidade

    setComments([...comments, newCommentText]);
    setNewCommentText(''); //forma declarativa
    //event.target.comment.value = ''; Forma imperativa
  }

  function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Campo Obrigatório');
  }

  function deleteComment(commentToDelete: string) {
    //imutabilidade -> as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete; //NOVA lista sem o comentário deletado
    });

    setComments(commentsWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0; //Práticas de Clean Code

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl}  />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((text) => {
          if (text.type === 'paragraph') {
            return <p key={text.content}>{text.content}</p>;
          } else if (text.type === 'link') {
            return (
              <p key={text.content}>
                <a href="#">{text.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText} //forma declarativa
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment} //'on' - Ação do usuário
            />
          );
        })}
      </div>
    </article>
  );
}
