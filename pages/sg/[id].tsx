import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import { supabase } from '../../lib/supabaseClient';

type List = {
  id: string;
  title: string;
  created_at: string;
};

type Props = {
  list?: List[];
  errors?: string;
};

const SgPage: NextPage<Props> = ({ list, errors }) => {
  const router = useRouter();
  if (router.isFallback) <div>Loading...</div>;
  if (errors) return <div>Error...</div>;
  if (!list?.length) return <div>missing data...</div>;

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>TITLE</td>
            <td>CREATED_AT</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SgPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from('sample').select('id');
  if (!data) {
    return {
      paths: [],
      fallback: false,
    };
  }
  const paths = data.map((post) => ({ params: { id: JSON.stringify(post.id) } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const { data } = await supabase.from<List>('sample').select('*').filter('id', 'eq', id);

    return {
      props: {
        list: data,
      },
    };
  } catch (error: any) {
    return { props: { errors: error.message } };
  }
};
