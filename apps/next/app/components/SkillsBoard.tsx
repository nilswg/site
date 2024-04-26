import { memo } from 'react';
import { MySkills, Skill, SkillsContainer } from '@nilswg-site/ui';
import { Image } from './Image';

export const SkillsBoard = memo(() => {
    return (
        <SkillsContainer>
            {MySkills.map(({ id, img }) => {
                return (
                    <Skill key={`skill_${id}`}>
                        <Skill.Image>
                            <Image src={img} alt={`skill ${id}`} width={64} height={64} />
                        </Skill.Image>
                        <Skill.Text id={id}></Skill.Text>
                    </Skill>
                );
            })}
        </SkillsContainer>
    );
});
