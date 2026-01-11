import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutAuthor.module.css';

export default function AboutAuthor({ author, prevPost, nextPost }) {
    return (
        <div className={styles.container}>
            <div className={styles.bioSection}>
                <h3 className={styles.title}>About {author.name}</h3>
                <div className={styles.avatar}>
                    {author.avatar ? (
                        <Image
                            src={author.avatar}
                            alt={author.name}
                            width={100}
                            height={100}
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div className={styles.placeholderAvatar}>{author.name.charAt(0)}</div>
                    )}
                </div>
                <p className={styles.bio}>{author.bio}</p>
            </div>

            <div className={styles.navigation}>
                {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className={styles.navButton}>
                        <span className={styles.navIcon}>←</span> Previous
                    </Link>
                ) : (
                    <div className={styles.navButtonDisabled}>
                        <span className={styles.navIcon}>←</span> Previous
                    </div>
                )}
                <div className={styles.navSpacer}></div>
                {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className={styles.navButton}>
                        Next <span className={styles.navIcon}>→</span>
                    </Link>
                ) : (
                    <div className={styles.navButtonDisabled}>
                        Next <span className={styles.navIcon}>→</span>
                    </div>
                )}
            </div>

            <div className={styles.navTitles}>
                <span className={styles.prevTitle}>
                    {prevPost ? prevPost.title : ''}
                </span>
                <span className={styles.nextTitle}>
                    {nextPost ? nextPost.title : ''}
                </span>
            </div>
        </div>
    );
}
