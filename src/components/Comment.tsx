import styles from './Comment.module.css';

import { ThumbsUp } from '@phosphor-icons/react';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0); //Valor Inicial dentro de useState, iniciar a informação que seja do mesmo tipo que a informação que for armazenada, por isso 0 (quantidade de likes)

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeCount() {
    //setLikeCount(likeCount + 1); //Valor inicial dos likes + 1
    //Forma Closure (recomendada)
    setLikeCount((valorMaisAtual) => {
      return valorMaisAtual + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/danilo-marra.png"
        alt=""
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Danilo Marra</strong>
              <time title="11 de maio às 8h13" dateTime="2023-05-11 08:13:30">
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          {/* <button onClick={() => setLikeCount(likeCount + 1)}>  Outra forma de fazer (não recomendado) */}
          <button onClick={handleLikeCount}>
            {' '}
            {/* Precisam executar a função e não a execução da função */}
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
