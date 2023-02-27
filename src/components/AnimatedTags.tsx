import {
  animated,
  useChain,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import Tag from "./Tag";
import { useEffect, useState } from "react";

const TagAnimated = animated(Tag);

interface Props {
  tags: string[];
}

export default function AnimatedTags({ tags }: Props) {
  const [open, setOpen] = useState(false);

  const springApi = useSpringRef();

  const transApi = useSpringRef();
  const transition = useTransition(open ? tags : [], {
    ref: transApi,
    trail: 400 / tags.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  useEffect(() => {
    if (!open) setOpen(true);
  }, [open]);

  return (
    <>
      <animated.ul>
        {transition((style, tag) => {
          return <TagAnimated name={tag} size="lg" style={{ ...style }} />;
        })}
      </animated.ul>
    </>
  );
}
